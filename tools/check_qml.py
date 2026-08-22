#!/usr/bin/env python3
"""Catches QML mistakes that qmllint accepts and the engine then rejects.

A duplicate function or id makes the component fail to instantiate, which on a
reader looks like the app no longer opening: main.cpp exits when the scene has
no root object, and there is no console to say why.
"""
import collections
import glob
import os
import re
import sys

QML_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
                       "qt", "qml")

def duplicates(names):
    return [n for n, count in collections.Counter(names).items() if count > 1]

problems = []
for path in sorted(glob.glob(os.path.join(QML_DIR, "*.qml"))):
    src = open(path, encoding="utf-8").read()
    name = os.path.basename(path)
    for fn in duplicates(re.findall(r'^\s*function\s+(\w+)\s*\(', src, re.M)):
        problems.append("%s: function %s declared twice" % (name, fn))
    for ident in duplicates(re.findall(r'^\s*id:\s*(\w+)\s*$', src, re.M)):
        problems.append("%s: id %s used twice" % (name, ident))
    if src.count("{") != src.count("}"):
        problems.append("%s: braces don't balance" % name)

for p in problems:
    print("qmlcheck: " + p, file=sys.stderr)
print("qmlcheck: %d files, %d problems" % (len(glob.glob(os.path.join(QML_DIR, "*.qml"))),
                                           len(problems)))
sys.exit(1 if problems else 0)
